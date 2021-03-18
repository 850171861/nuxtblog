# blog

## 预览地址:http://www.wudongming.com

项目目录介绍
>client ：该文件夹存放前端代码（即用户访问的页面代码）
>admin ：该文件夹存放管理后台代码（即博主用来管理博客内容的地方）
>api ： 该文件夹用来提供 API 服务（即为 blog 和 admin 提供接口，进行与数据库的交互）

项目如何部署
---

# 一、购买服务器和域名 ##
  如果需要域名（不用域名通过ip也可以访问，虽然不方便，但可以节约一年几十块钱的域名费用，哈哈），建议提前购买，因为域名备案的时间比较长。  

我是在腾讯云上购买的服务器和域名，购买服务器[传送门](https://cloud.tencent.com/product/cvm?from=13950)，（如果是学生可以购买学生服务器）

### 购买服务成功后进入腾讯云控制台页面，点击左侧的实例，这时候你就可以看到你的服务器信息，服务器配置以及服务器内ip和公ip
---
# 二、服务器环境搭建 ##  
 在腾讯云控制台，点击左侧的实例，服务器信息最右边点击登录设置自己的登录密码，登录成功（如下图）
![1.PNG](http://www.wudongming.com:3001/20210315/5cebd077-5050-452f-b7f3-9f4c308db173.PNG)   

新购买的服务器什么都没有，需要根据自己的须要搭建环境,我的博客服务端是用node搭建的，所以我给服务器搭建的是node环境，其他环境请自行百度~（我的服务器系统是 CentOS 7.5 64位）。

## 1. 格式化和挂载数据盘（没有购买独立数据盘可以跳过）
腾讯云文档链接[Linux 格式化和挂载数据盘] 
(https://cloud.tencent.com/document/product/213/17487)照着教程一步一步来就好了。

## 2.安装数据库   
我的blog用的是mongodb，所有这里我安装mongodb环境，安装前，进入腾讯云控制台，点击左侧的实例，服务器信息最右边点击登录，登录成功如上面的图，和命令行界面一样   

### （1）创建一个/etc/yum.repos.d/mongodb-enterprise.repo文件，内容如下 ：
``` javascript

[mongodb-enterprise]
name=MongoDB Enterprise Repository
baseurl=https://repo.mongodb.org/yum/redhat/#releasever/mongodb-org/4.0/x86_64
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

```    
保存好文件，就可以使用以下yum命令直接安装MongoDB默认情况下，MongoDB使用mongod用户帐户运行，并使用以下默认目录：
/var/lib/mongo （数据目录）
/var/log/mongodb （日志目录）
执行安装命令
``` javascript
sudo yum install -y mongodb-enterprise
```      

### （2）启动MongoDB服务

``` javascript   
systemctl start mongod
#设置开机启动
systemctl enable mongod
```   

### （3）进入MongoDB并查询
``` javascript   
mongo
show dbs
```    
![2.PNG](http://www.wudongming.com:3001/20210315/4a61d06b-d518-435a-9564-8c88b132cd75.PNG)    
如果出现跟上图一样表示mongoodb安装成功

### (4)允许其他ip数据库端口   

进入系统目录
``` javascript 
 vi /etc/mongod.conf
```
找到net:项，修改如下：  
``` javascript 
net:
  port: 27017
  bindIp: 0.0.0.0 #允许其他IP
```
然后重启mongo 
``` javascript 
systemctl restart mongod
```
### （5）开放mongodb防火墙端口
开启27017端口
``` javascript 
firewall-cmd --zone=public --add-port=27017/tcp --permanent
```
重启防火墙
``` javascript 
firewall-cmd --reload
```
查看mongodb数据库 27017端口是否开启
``` javascript 
firewall-cmd --query-port=27017/tcp
```
## 3.安装nodejs 
安装nodejs[传送们](https://cloud.tencent.com/developer/article/1599040)       

## 4.安装pm2 守护node进程
###（1）、执行命令
``` javascript 
 npm install -g pm2
```
###（2）、验证是否安装成功，执行命令
``` javascript 
 pm2 -v
```
## 5.安装nginx（默认80端口）
``` javascript 
yum -y install nginx
```
``` javascript 
service nginx start
```

---

# 三、项目部署
##### 在上面步骤中已经安装好了环境有 mongodb、nodejs、pm2、nginx    
##### 安装好环境后开始把本地的项目放到服务器里跑起来，在跑起来之前，需要把项目上传到服务器中，我本地是w10系统所以这里我用上传软件是WinSCP，WinSCP是一款支持SSH（Secure SHell）的SCP（Secure CoPy）文件传输软件，[winscp下载传送门](https://winscp.net/eng/download.php)     

![1.PNG](http://www.wudongming.com:3001/20210315/af012cfe-18ed-4804-a928-5d918724cce2.PNG)   

当下载完成安装，打开winscp，主机名输入你服务端的公IP，用户名和密码（如果忘记密码，可以进入在腾讯云控制台，点击左侧的实例里面修改）

登录成功之后在根目录下新建一个文件夹，这里我起名为blog，进入blog，新建2个文件夹，一个文件夹api，一个文件夹client
![2.PNG](http://www.wudongming.com:3001/20210315/cd29f679-881e-4292-8f88-3a5573a4e469.PNG)    

创建文件夹完成之后，
## 1、api部署
把本地的api项目上传到/blog/api文件夹中（这里不需要上传node_modules）,上传完成之后，进入 cd /blog/api目录执行
``` javascript 
npm install
pm2 index.js
```
![3.PNG](http://www.wudongming.com:3001/20210315/5c6501bd-2dfe-47d0-99fc-473e5990ef56.PNG)   
pm2 status为online 说明api已经成功启动了    
直接在浏览器输入你的域名（没有域名输入你ip地址:端口号）测试api能否查询到数据证明项目api部署成功
![4.PNG](http://www.wudongming.com:3001/20210315/342c159f-6413-473d-8eb4-ce9304e2b367.PNG)    


## 2、cms后台管理部署
在本地admin项目进入cmd执行npm run build进行打包，打包后在admin根目录就有一个dist文件，直接把这个文件复制到服务器的 /blog/api/public目录下
直接在浏览器输入你的直接在浏览器输入你的域名（没有域名输入你ip地址+api端口号）/dist/index.html,如果出现登录界面代表成功了
![5.PNG](http://www.wudongming.com:3001/20210315/0450e176-a26b-47a6-acd8-c93d067762b0.PNG)   

## 3、blog前端部署
在本地的client项目进入cmd执行npm run build 进行打包，打包完成后将(.nuxt、assets、static、nuxt.config.js、package.js)上传文件之前修改package.js指定端口
``` javascript 
 "config": {
    "nuxt": {
        "host": "0.0.0.0",
        "port": "3000"
    }
}
```
修改完成
将这5个文件上传到服务器 /blog/client文件夹中
在服务器中cd /blog/client进入项目目录执行
``` javascript 
npm install
pm2 start npm -- start
```    
![7.PNG](http://www.wudongming.com:3001/20210316/28a1fcfe-292f-4a3b-a0fd-49cfcca07555.PNG)   
如果出现跟上图一样代表部署成功
直接在浏览器输入你的域名（没有域名输入你ip地址:3000）测试是否能进入的你前端项目中。
![8.PNG](http://www.wudongming.com:3001/20210316/672818b6-8a92-4760-9ef2-e8fd5e160c83.PNG)

## 4、nginx反向代理
在上面完成了，但是我们的路由是后面是要加：3000端口才能访问的，所有我们使用nginx把3000端口代理到80端口上   
进入 cd /etc/nginxnginx.conf目录把server修改如下   

``` javascript 
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;  #这里写您的域名
        root          /home/data;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
 proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://localhost:3000/;
        }  
      
    }

``` 
保存后重起nginx 
``` javascript 
systemctl restart nginx
```   
在浏览器输入你的域名就可以直接访问，不需要在加：3000端口 

![11.PNG](http://www.wudongming.com:3001/20210316/05bce6f1-2129-46a4-badc-fed4e5656180.PNG)   
---





