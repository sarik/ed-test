#
changed
ed-portal-web-app
Container app that governs all other related apps

**Portal app is required to run all other apps**

## Env Guide: 
- Create one folder(root) for all frontend apps  
- Clone portal app and all other required app in this folder    
- Name of each app folder should be same as name of corresponding github-repo
- Install bit globally using the following commands in your terminal:  
```
npm install bit-bin -g
```  
- Initialize a Bit workspace in the project’s directory(root)  
```
bit init
```  
- Authenticate Bit to your bit.dev account. Use bit login to open a login page in the browser and authenticate.  
```
bit login
```  
- Configure Bit as a scoped registry:  
```
npm config set '@bit:registry' https://node.bit.dev
```   
_for bit.dev docs refer: [https://docs.bit.dev/](https://docs.bit.dev/)_   
- Go to `ed-portal-web-app` folder in your terminal and run:  
```
npm run install-all
```  
- This will install all required dependencies in all the apps
- Start all apps by running following command in `ed-portal-web-app` in your terminal:
```
npm run start-all
```
- Visit  `http://localhost:8233/`
