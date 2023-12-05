import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
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
  }
}