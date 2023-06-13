import Lambda, { Context } from "aws-lambda";
import AWS from "aws-sdk";

const codebuild = new AWS.CodeBuild();

// CodeCommitクライアントの作成
const codecommit = new AWS.CodeCommit();

type DetailType = {
  callerUserArn: string;
  commitId: string;
  event: string;
  referenceFullName: string;
  referenceName: string;
  referenceType: string;
  repositoryId: string;
  repositoryName: string;
};

export async function codeCommitToCodeBuild(
  event: Lambda.EventBridgeEvent<
    "CodeCommit Repository State Change",
    DetailType
  >,
  context: any
) {
  event.detail;
  console.log(JSON.stringify(event, null, 2));
  console.log(JSON.stringify(context, null, 2));

  try {
    console.log("detail Event: ", event.detail.event);
    // CodeCommitからリポジトリを取得
    const repoResponse = await codecommit
      .getRepository({
        repositoryName: event.detail.repositoryName,
      })
      .promise();

    const cloneUrl = repoResponse?.repositoryMetadata?.cloneUrlHttp;
    const getCommitParams = {
      commitId: event.detail.commitId,
      repositoryName: event.detail.repositoryName,
    };
    // CodeCommitから最後のコミットメッセージを取得
    const commitDetails = await codecommit.getCommit(getCommitParams).promise();
    const commitMessage = commitDetails.commit.message;
    console.log("Commit Message:", commitMessage);

    // CodeBuildプロジェクトを起動するためのパラメータを設定
    const params: AWS.CodeBuild.Types.StartBuildInput = {
      // ここが動かない？
      projectName: "oyama-codecommit-to-codebuild-dev",
      sourceVersion: event.detail.referenceName,
      sourceLocationOverride: cloneUrl,
      sourceTypeOverride: "CODECOMMIT",
      artifactsOverride: {
        type: "NO_ARTIFACTS",
      }
    };

    if (!commitMessage) {
      return console.log("コミットメッセージがありません。");
    }

    if (commitMessage.includes("e2e:test")) {
      await codebuild.startBuild(params).promise();
      console.log("CodeBuildプロジェクトが起動されました。");
    }

  } catch (error) {
    console.error("CodeBuildプロジェクトの起動に失敗しました。", error);
  }
}
