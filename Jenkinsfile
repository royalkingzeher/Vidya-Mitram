pipeline {
	agent any
	tools {
	maven 'MAVEN_HOME'
	}
	stages {
		stage('Stage1: Hello Clean Stage 1') {
			steps {
				echo 'mvn clean'
				}
			}
		stage ('Stage 2: Test Stage') {
			steps {
				echo 'mvn test'
				}
			}
		stage ('Stage 3: My Package'){
			steps {
				echo 'mvn package'
				}
			}			
		stage ('Stage 4: My Final Build Stage'){
			steps {
				echo 'mvn install'
				}
			}	
		stage ('Stage Final: Build Success'){
			steps {
				echo  'Build Success!'
				}
			}
		}
	}		
