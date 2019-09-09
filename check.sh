
if [ "$(docker ps -aq -f status=exited -f name=ies-fees)" ]; then
		docker rm ies-fees
		docker run -p 8002:8008 --name ies-fees --restart=always --net=mongo-network ies-fees &
		sleep 10s
	fi

