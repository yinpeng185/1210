#### git 使用手册

+ 添加本地修改文件到暂存区 : 
	```
	 git add . 
	 // 或者 : git add file_name
	```
+ 对提交的内容做说明 : 
	```
	 git commit -m 说明文字
	```
+ 提交更改到远程仓库 : 
	```
	 git push 远程仓库名 分支
	```
+ 拉取远程仓库的代码改动 : 
	```
	 git pull 远程仓库名 分支
	```
+ 查看已添加的远程仓库 : 
	```
	 git remote -v
	```
+ 添加远程仓库 : 
	```
	 git remote add 仓库别名 仓库地址
	```
+ 切换分支 : 
	```
	 git checkout 分支名
	```
+ 创建分支 : 
	```
	 git branch 新分支名
	```
+ 合并分支 : 
	```
	 git merge 分支名
	```
+ 克隆仓库 : 
	```
	 git clone [-b 分支名] 仓库地址 保存目录
	```
+ 查看当前修改和提交状态 : 
	```
	 git status
	```
+ 查看提交和更改历史 : 
	```
	 git log
	```
+ 版本回滚 : 
	```
	 git reset [--hard] 提交历史的唯一版本识别号
	```



