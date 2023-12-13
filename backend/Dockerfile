FROM node:alpine

# Install python/pip
RUN apk add --update --no-cache --virtual .gyp \
bash \
g++ \
make \
python3 \
py3-pip \
&& ln -sf python3 /usr/bin/python

# Create user
RUN \
adduser -S code -G node \
-h /home/code \
-s /bin/bash

#Install app deps
WORKDIR /home/code/app
COPY ./package.json .
RUN npm install
COPY . .

#Start python venv and install modules
USER code
ENV VIRTUAL_ENV=/home/code/playground/venv
RUN /usr/bin/python3 -m venv ${VIRTUAL_ENV}
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"
RUN pip install RestrictedPython
RUN pip install numpy matplotlib

#Setup user permissions
USER root

RUN \
mkdir -p /home/code/bin && \
chmod 755 /home/code/bin && \
echo "PATH=/home/code/bin;" > /home/code/.bashrc && \
echo "export PATH;" >> /home/code/.bashrc && \
ln -s /bin/sh /home/code/bin/ && \
ln -s /bin/bash /home/code/bin/ && \
ln -s /usr/bin/python3 /home/code/bin/ && \
ln -s /usr/local/bin/node /home/code/bin/ 
#cp /bin/sh /home/code/bin/ && \
#cp /bin/bash /home/code/bin/ && \
#cp /usr/bin/python3 /home/code/bin/ && \
#cp /usr/local/bin/node /home/code/bin/ 


#RUN \ 
#chmod 700 /bin/ && \
##chmod 700 /dev/ && \
##chmod 700 /etc/ && \
##chmod 700 /home/ && \
##chmod 700 /lib/ && \
##chmod 700 /media/ && \
##chmod 700 /mnt/ && \
##chmod 700 /opt/ && \
##chmod 700 /proc/ && \
##chmod 700 /root/ && \
##chmod 700 /run/ && \
#chmod 700 /sbin/ && \
##chmod 700 /srv/ && \
##chmod 700 /sys/ && \
##chmod 700 /tmp/ && \
#chmod 700 /usr/bin/ && \
##chmod 700 /usr/include/ && \
##chmod 700 /usr/lib/ && \
##chmod 700 /usr/libexec/ && \
#chmod 711 /usr/local/* && \
#chmod 711 /usr/local/bin/* && \
#chmod 700 /usr/sbin/
##chmod 700 /usr/share/ && \
##chmod 700 /usr/x86_64-alpine-linux-musl/ && \
##chmod 700 /var/

#RUN chmod 755 /usr/local/bin/docker-entrypoint.sh

#RUN \ 
#chown root /home/* && \
#chown root /home/node* && \
#chown root /home/code/* && \
#chown root /home/code/app/* && \
#chown root /home/code/playground/*

#RUN chmod 711 /home/code/
#RUN chmod 711 /home/code/app
#RUN chmod 711 /home/code/playground

USER code

CMD [ "node", "index.js" ]