#!/bin/bash

if [ -z "$1" ];

  then
    printf "\n"
    echo "Usage:"
    echo "    $0 -b or --backend for Backend Dev Server"
    echo "    $0 -f or --frontend for Frontend Dev Server"

  else

    case "$1" in
      -b | --backend)
          # printf "\n"
          # echo "Check MongoDB at mongodb://localhost:27017"
          # docker-compose up -d mongodb-dev
          echo "Check Backend Server at http://localhost:3030"
          echo "Check  Debugger at http://localhost:9229"
        NODE_ENV=development npm start
        ;;

      -f | --frontend)
        printf "\n"
        echo "Check Frontend Server at http://localhost:3000"
        printf "\n"
        cd frontend && ./dev-server.sh
        ;;
      *)

        printf "\n"
        echo "Usage:"
        echo "    $0 -b or --backend for Backend Dev Server"
        echo "    $0 -f or --frontend for Frontend Dev Server"
        ;;
    esac
fi
