node {
    def skipTestsBranches = ['master'] // branches that always skip tests, otherwise use #notest in your commit message
    def gitCommit
    def gitLogMessage
    def softFailTests=false
    def skiptests=true //skipTestsBranches.contains(env.BRANCH_NAME)

    env.NODEJS_HOME = "${tool 'node12'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    sh 'npm --version'

    try {
        try {
            stage('Setup') {
                properties([pipelineTriggers([[$class: "GitHubPushTrigger"]])])
                properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '20']]]);
                checkout scm
                gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                gitLogMessage = sh(returnStdout: true, script: 'git log --format=%B -n 1 ' + gitCommit).trim()
                skiptests = skiptests || gitLogMessage.toLowerCase().indexOf("#notest") >= 0
                setInitialGithubBuildStatus(skiptests)
            }

        } catch (e) {
            echo 'Setup failure: ' + e
            currentBuild.result = 'NOT_BUILT'
        }

        try {
            stage('Build') {
                timeout(time: 10, unit: 'MINUTES') {
                    sh "npm install"
                    sh "npm run-s build"
                    currentBuild.result = 'SUCCESS'
                    setGithubBuildStatus("build", "Build complete", "SUCCESS");
                }
            }
        } catch (e) {
            echo 'Build failure: ' + e
            currentBuild.result = 'FAILURE'
            setGithubBuildStatus("build", "Build failed", "FAILURE");
        }

        if (!skiptests) {
            try {
                stage('Test') {
                    echo "testing.."
                    timeout(time: 15, unit: 'MINUTES') {
                        sh "npm run-s test"
                    }
                }

            } catch (e) {
                echo 'Test failure: ' + e
                currentBuild.result = 'FAILURE'
                setGithubBuildStatus("test", "Failing tests", "FAILURE");
            }

            if (currentBuild.result in ["FAILURE","UNSTABLE"]) {
                setGithubBuildStatus("test", "Failing tests", "FAILURE");

                if (env.BRANCH_NAME in ["develop", "master"]) {
                    gitAuthor = sh(returnStdout: true, script: 'git show --format="%aN" HEAD | head -n 1').trim()
                    if (currentBuild.getPreviousBuild() != null && currentBuild.getPreviousBuild().result in ["FAILURE", "UNSTABLE"]) {
                        sendSlackMsg("${gitAuthor} pushed to a broken build ${getAngryMeme()}", "JENKINS", "red")
                    } else {
                        sendSlackMsg("${gitAuthor} broke the build ${getAngryMeme()}", "JENKINS", "red")
                    }
                }

            } else if(currentBuild.result == "SUCCESS") {
                setGithubBuildStatus("test", "Tests passing", "SUCCESS");
            }
        }

        if (currentBuild.result == "FAILURE") {
            error("The build obviously failed.")

        } else if(currentBuild.result in [null, "SUCCESS"]) {
            echo "great success: " + currentBuild.result
        }

        if(currentBuild.result in [null, "SUCCESS", "UNSTABLE"]) {
            echo 'Publishing results'

            stage('Publish') {
                if (env.BRANCH_NAME in ["master"]) {
                    def bucket = "partners.sendwyre.com"
                    step([$class: 'S3BucketPublisher', profileName: 'wyre-s3-production', entries: [[sourceFile: 'build/**', bucket: bucket, storageClass: 'STANDARD', selectedRegion: 'us-west-2', noUploadOnFailure: true, managedArtifacts: false, useServerSideEncryption: true, flatten: false, keepForever: false, showDirectlyInBrowser: false]], userMetadata: [], pluginFailureResultConstraint: 'FAILURE', dontWaitForConcurrentBuildCompletion: false, consoleLogLevel: 'INFO'])
                    sendSlackMsg("wyre-wallet-partners  " + env.BRANCH_NAME + " build uploaded to S3", "JENKINS", "green")
                }
            }
        }

        stage('Deploy') {
            if (env.BRANCH_NAME in ["master"]) {
                def cloudfrontDistrubution = "ECA6BB3ODFLB5" // partners.sendwyre.com

                withAWS(credentials:'wyre_s3_production_creds') {
                    cfInvalidate(distribution:cloudfrontDistrubution, paths:[
                    '/*'
                    ])
                }
            }
        }

    } catch (e) {
        echo 'Build fail: ' + e
        throw e
    }
}

void setInitialGithubBuildStatus(skiptests) {
    setGithubBuildStatus("build", "Build", "PENDING");

    if(!skiptests)
        setGithubBuildStatus("test", "Test", "PENDING");

    setGithubBuildStatus("publish", "Upload", "PENDING");

    if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'rc')
        setGithubBuildStatus("deploy", "Deploy", "PENDING");
}

void setGithubBuildStatus(context, message, state) {
    step([
          $class: "GitHubCommitStatusSetter",
          contextSource: [$class: "ManuallyEnteredCommitContextSource", context: context],
          reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/sendwyre/wyre-wallet-partners"],
          errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
          statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
      ]);
}

void sendSlackMsg(String message, String from, String color) {
    String branchname = env.BRANCH_NAME.replaceAll('/','%252F')
    String buildLink = "https://jenkins.i.sendwyre.com/job/wallet-partners/job/${branchname}/${env.BUILD_NUMBER}/"
    message += " " + buildLink
    String json = '{"channel": "#dev", "text": "' + message + '"}'
    String command = "curl -v -X POST --data-urlencode 'payload=" + json + "' https://hooks.slack.com/services/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"
    sh command
}
