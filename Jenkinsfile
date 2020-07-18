#!/usr/bin/env groovy

def agentLabel = null
node(label: 'do-slave') {
    stage('Checking do-slave') {
        checkout scm
        agentLabel = 'builder'
        
        echo "do-slave done"
        
        
        
        
    }
}

pipeline { 
    agent {
        label agentLabel
    }


    stages {
        stage('checking builder') {
            steps {
                echo "Getting builder IP..."
                
                nodejs('nodejs') {
                         sh 'npm i 2>&1'
                     }
                
                
                
                
            }
        }
        
       
    }
    post {
        always {
            echo "Build ${env.BUILD_NUMBER} finished......"
        }
        
    }
}
