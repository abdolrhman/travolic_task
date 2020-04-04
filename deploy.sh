#!/bin/bash
docker build -t AbdulrahmanSoliman/travolic_task .
docker push AbdulrahmanSoliman/travolic_task

ssh deploy@$DEPLOY_SERVER << EOF
docker pull AbdulrahmanSoliman/travolic_task
docker stop travolic_task || true
docker rm travolic_task || true
docker rmi AbdulrahmanSoliman/travolic_task:current || true
docker tag AbdulrahmanSoliman/travolic_task:latest AbdulrahmanSoliman/travolic_task:current
docker run -d --restart always --name travolic_task -p 3000:3000 AbdulrahmanSoliman/travolic_task:current
EOF
