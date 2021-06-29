FROM debian:stretch AS install

# some more steps here but won't list all of them

ENV GOLANG_VERSION 1.14

RUN apt-get update
RUN apt-get install wget -y
RUN apt-get install git -y

RUN wget -O go.tgz "https://golang.org/dl/go$GOLANG_VERSION.linux-amd64.tar.gz" && \
    tar -C /usr/local -xzf go.tgz && \
    rm go.tgz && \
    mkdir /go

ENV GOROOT /usr/local/go
ENV GOPATH /go
ENV PATH $GOPATH/bin:$GOROOT/bin:$PATH

ADD app/ /go/src/app
ADD web/ /go/src/web

RUN go version

RUN go get -v github.com/gin-gonic/gin
RUN go get go.mongodb.org/mongo-driver/mongo
RUN go install app

RUN go run /go/src/app/main.go

EXPOSE 8080

ENTRYPOINT /go/src/