Setup steps assuming you already have node & npm installed (otherwise go get them first, heres a guide: https://docs.npmjs.com/getting-started/installing-node):

Once you are ready with node & npm installed, you will need the npm module "http-server" (https://www.npmjs.com/package/http-server). Run the following terminal commands whilst inside this directory:

npm install http-server -g

http-server -p 8080

Visit http://localhost:8080/

The API that serves this data is just a virtual machine running on cloud9.io (which isn't actually a hosting environment to be relied on). I've got a paid plan and I can keep it running so it "shoudn't" go down unless they are doing maintenance. Let me know if the API goes down, it's always just a case of me restarting the virtual machine.
