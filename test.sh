#!/bin/bash

if [ -z "$1" ];
  then
    echo "Usage:"
    echo "    $0 -b  or --backend for the Backend tests"
    echo "    $0 -f  or --frontend for Frontend tests"
  else
    case "$1" in
      -b | --backend)
        printf "\n"
        echo "Running tests for the backend app"
        printf "\n"
        npm run test
        ;;
      -f | --frontend)
        printf "\n"
        echo "Running tests for the frontend app"
        printf "\n"
        cd frontend && npm run test
        ;;
      *)
        echo "Usage:"
        echo "    $0 -b  or --backend for the Backend tests"
        echo "    $0 -f  or --frontend for Frontend tests"
        ;;
    esac
fi
