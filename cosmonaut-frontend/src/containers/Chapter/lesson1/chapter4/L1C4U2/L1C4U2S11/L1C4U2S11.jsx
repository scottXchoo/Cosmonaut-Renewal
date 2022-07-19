import React from "react";
import tw from "tailwind-styled-components";
import CodeEditor from "../../../../../../components/CodeEditor/CodeEditor";
import BasicP from "../../../../../../components/Contents/BasicP";
import CodeBlock from "../../../../../../components/Contents/CodeBlock";
import ContentsBox from "../../../../../../components/Contents/ContentsBox";
import GreenID from "../../../../../../components/Contents/GreenID";
import Header from "../../../../../../components/Contents/Header";
import Markdown from "../../../../../../components/Contents/Markdown";
import L1C4U2S11Code from "./L1C4U2S11Code";

const Contents = tw.section`bg-black`;
const ContentTitle = tw.div`mb-4 lg:mb-8`;
const ContentDesc = tw.div`mb-3`;

const code1 = `
\`\`\`rust
QueryMsg::Minter {} => to_binary(&self.minter(deps)?),
\`\`\``;

function L1C4U2S11() {
  return (
    <>
      {/* Contents Part */}
      <Contents>
        <ContentsBox>
          <GreenID>11</GreenID>
          <div class="lg:w-1/2 w-full md:w-2/3">
            <ContentTitle>
              <div class="flex sm:flex-nowrap">
                <div class="w-full lg:w-auto lg:pt-3 pt-2 pb-2 lg:pb-0">
                  <Header>Minter</Header>
                </div>
              </div>
            </ContentTitle>
            <ContentDesc>
              <Markdown code={code1} />
              <BasicP>
                It is not specified in the <CodeBlock>CW721 Spec</CodeBlock>,
                but implemented for convenience.
              </BasicP>
              <BasicP>Returns the Minter address of this contract.</BasicP>
            </ContentDesc>
          </div>
        </ContentsBox>
      </Contents>

      {/* Editor Part */}
      <CodeEditor>
        <L1C4U2S11Code />
      </CodeEditor>
    </>
  );
}

export default L1C4U2S11;