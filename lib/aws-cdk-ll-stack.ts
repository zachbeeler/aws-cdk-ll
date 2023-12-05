import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';
import { ManualApprovalAction } from 'aws-cdk-lib/aws-codepipeline-actions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('zachbeeler/aws-cdk-ll', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-east-2:268548213468:connection/c6ef8d1b-6212-40f8-8e60-02383520bd73'
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "testing", {
      env: {account: "268548213468", region: "us-east-1"}
    }))

    const prod = new MyPipelineAppStage(this, 'Prod');
    pipeline.addStage(prod, {
      pre: [
        new cdk.pipelines.ManualApprovalStep('PromoteToProd')
      ]
    });
  }
}