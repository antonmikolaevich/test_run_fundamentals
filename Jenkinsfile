pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('UI') {
            steps {
                bat 'npm run test'
            }
        }
        stage('WDIO-Nice-Report'){
            steps {
                bat 'npm run report'
            }
        }
    }
    post {
        always {
            junit allowEmptyResults: true, testResults: '*.xml'
            archiveArtifacts artifacts: '*.xml'
            archiveArtifacts artifacts: 'reports/html-reports/*.html'
        }
    }
}