pipeline { 
    agent {
        label 'builder'
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
