pipeline {
    agent any

    environment {
        NODE_VERSION = '18.18.0' // Specifica la versione Node.js
    }

    tools {
        nodejs "NodeJS-${env.NODE_VERSION}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/mobdalla/website.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        def pkg = readJSON file: 'package.json'
                        if (pkg.scripts?.test) {
                            sh 'npm test'
                        } else {
                            echo 'Nessuno script di test trovato, salto i test.'
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploying the application..."'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/build/**', allowEmptyArchive: true
        }
        failure {
            echo "Build fallita. Controlla Jenkins per i dettagli."
        }
    }
}
