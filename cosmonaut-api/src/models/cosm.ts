import { Request } from "express";
import httpStatus from "http-status";
import { pg } from "@d3lab/db";
import { makeLessonPicturePath } from "@d3lab/utils";
import {APIError} from "@d3lab/types"

const PG = pg.PgSingle.getInstance()

async function getAssetLoc(req: Request, lesson?: number): Promise<(string|Error|undefined)[]> {
    let pgClient;
    try {
        const issuer = req.session.passport?.user.issuer;
        const id = req.session.passport?.user.id;

        let l: number|undefined;

        if (lesson === undefined) {
            l = Number(req.query.lesson)
        } else {
            l = lesson
        }

        pgClient = await PG.getClient();
        const res = await pgClient.query(
            "SELECT loc, status FROM assets WHERE provider = $1 AND subject = $2 AND lesson = $3",
            [issuer, id, l]
        );
        if (res.rows[0] !== undefined) {
            return [res.rows[0]["loc"], res.rows[0]["status"]];
        } else {
            return [Error("There is no asset to load"), undefined];
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(
                "Unexpected error occured during get asset location"
            );
        }
    } finally {
        pgClient?.release();
    }
}

async function setAssetLoc(req: Request, status: string) {
    let pgClient;
    try {
        const issuer = req.session.passport?.user.issuer;
        const id = req.session.passport?.user.id;
        const lesson = Number(req.body.lesson);
        let asset_loc = makeLessonPicturePath(lesson);
        if (status === "start" || status === "doing") {
            asset_loc += `/${status}.png`;
        } else if (status === "done") {
            asset_loc += `/${status}.jpg`;
        }

        pgClient = await PG.getClient();;
        await pgClient.query("CALL update_asset($1, $2, $3, $4, $5)", [
            issuer,
            id,
            lesson,
            status,
            asset_loc,
        ]);
    } catch (error) {
        throw error;
    } finally {
        pgClient?.release();
    }
}

async function getProgress(
    req: Request,
    lesson?: number
): Promise<{ lesson: number; chapter: number }> {
    const issuer = req.session.passport?.user.issuer;
    const id = req.session.passport?.user.id;
    let pgClient;
    try {
        pgClient = await PG.getClient();

        if (lesson !== undefined) {
            const res = await pgClient.query(
                "SELECT * FROM get_progress($1, $2, $3)",
                [issuer, id, lesson]
            );

            const progress = res.rows[0];
            if (progress === undefined) {
                return { lesson, chapter: -1 };
            } else {
                return {
                    lesson: res.rows[0]["res_lesson"],
                    chapter: res.rows[0]["res_chapter"],
                };
            }
        } else {
            const res = await pgClient.query(
                "SELECT lesson, chapter FROM users WHERE provider = $1 AND subject = $2 ORDER BY lesson desc",
                [issuer, id]
            );

            return res.rows[0];
        }
    } catch (error) {
        throw error;
    } finally {
        pgClient?.release();
    }
}

async function setProgress(req: Request, lesson: number, chapter: number) {
    const issuer = req.session.passport?.user.issuer;
    const id = req.session.passport?.user.id;
    let pgClient;
    try {
        pgClient = await PG.getClient();
        await pgClient.query("CALL update_lesson($1, $2, $3, $4)", [
            issuer,
            id,
            lesson,
            chapter,
        ]);
    } catch (error) {
        console.error(error);
    } finally {
        pgClient?.release();
    }
}

async function getChapterThreshold(
    lesson: number
): Promise<number | undefined> {
    let pgClient;
    try {
        pgClient = await PG.getClient();
        const res = await pgClient.query(
            "SELECT threshold FROM lesson_range WHERE lesson = $1",
            [lesson]
        );
        if (res.rows[0] === undefined) {
            throw new APIError(
                httpStatus.BAD_REQUEST,
                "This lesson does not exist."
            );
        }

        return res.rows[0]["threshold"];
    } catch (error) {
        throw error;
    } finally {
        pgClient?.release();
    }
}

// async function tmp(): Promise<> {
//     let pgClient;
//     try {
//         pgClient = await pg.getClient();
//     } catch (error) {
//         console.error(error);
//     } finally {
//         pgClient?.release();
//     }
// }

export {
    getAssetLoc,
    setAssetLoc,
    getProgress,
    setProgress,
    getChapterThreshold,
};
