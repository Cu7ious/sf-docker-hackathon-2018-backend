#!/bin/bash

if [ -z "$1" ];

  then
    printf "\n"
    echo "Usage:"
    echo "    $0 -h or --host <HOST_NAME> - the host:port of the API server"
    echo "    for ex: http://localhost:3030"
    printf "\n"
    exit
  else

    case "$1" in
      -h | --host)

        if [ -z "$2" ];

          then
            printf "\n"
            echo "Error: Missing argument for the --host key"
            printf "\n"
            echo "Usage:"
            echo "    $0 -h or --host [HOST_NAME] - the host:port of the API server"
            echo "    for ex: http://localhost:3030"
            printf "\n"
            exit
          else
            printf "\n"
            echo "Build process started with REACT_APP_HOST == $2"
            printf "\n"
            cd frontend
            NODE_ENV=production REACT_APP_HOST=$2 npm run build
            # cd ../
            # rm -rf ./public/*
            # cp -R ./frontend/build/* ./public/
        fi
        ;;

      *)

        printf "\n"
        echo "Usage:"
        echo "    $0 -h or --host [HOST_NAME] - the host:port of the API server"
        echo "    for ex: http://localhost:3030"
        printf "\n"
        exit
        ;;
    esac
fi
