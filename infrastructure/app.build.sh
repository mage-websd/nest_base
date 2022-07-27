VERSION=1.0.0-dev
IMAGE_TAG=ABCD
IMAGE_REPOSITORY=ABCDE

for COMMAND in "$@"
do
    case "${COMMAND}"
        in
        "prod")
            VERSION=0.0.1
            IMAGE_TAG=giangsoda/nest-base
            IMAGE_REPOSITORY=$IMAGE_TAG:$VERSION
        ;;
        "staging")
            VERSION=0.0.1
            IMAGE_TAG=giangsoda/nest-base-stg
            IMAGE_REPOSITORY=$IMAGE_TAG:$VERSION
        ;;
        "build")
            echo BUILD IMAGE: $IMAGE_REPOSITORY
            docker build --no-cache \
            -f ./Dockerfile -t $IMAGE_REPOSITORY ../
        ;;
        "push")
            docker push $IMAGE_REPOSITORY
        ;;
    esac
done
echo DONE AND DONE
