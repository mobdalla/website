pipeline {
    agent any

    environment {
        NODE_VERSION = '16' // Specify your Node.js version.
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/mobdalla/website.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js
                script {
                    def nodeHome = tool name: "NodeJS-${env.NODE_VERSION}", type: 'NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Run build script
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // Run tests if applicable
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Example deployment script
                sh 'echo "Deploying the application..."'
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: '**/build/**', allowEmptyArchive: true
        }
        failure {
            mail to: 'your-email@example.com',
                 subject: "Build Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                 body: 'Check Jenkins for details.'
        }
    }
}
