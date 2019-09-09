node {
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("ies-fees")
    }
   

     stage('Run image') {
        /*command to run the image */
		sh "sudo bash check.sh"
		sh "docker stop ies-fees"
        sh "docker rm ies-fees"
        sh "docker run -p 8012:8012 --name ies-fees --restart=always --net=mongo-network ies-fees &"
        sh "sleep 10s"
        sh "docker restart ies-fees"
    }

}