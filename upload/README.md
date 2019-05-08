###Simple upload server for uploading files. 

####Need arose after latest router firmware broke sftp and remove wget and we needed core dumps

npm install --save express express-fileupload

From host:

1. cd upload
2. node server.js # server listening on port 4000

From client:
1. curl --form name=testform --form file=@`file to be uploaded` http://`host ip`:4000/fileupload
```bash
  curl --form name=testform --form file=@core.1 http://192.168.1.151:4000
``` 
