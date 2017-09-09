:: copy files from cloned git folder to 
:: the local dev folder
:: this is run from the cloned folder

@ECHO OFF 
ECHO --------------------
ECHO copyGit2local.cmd
ECHO --------------------
ECHO BATCH FILE TO COPY FROM LOCAL DEV FOLDER GIT
ECHO TO FOLDER FOR MERGING AND PUSHING OUT.
ECHO ---------------------
:: ECHO ON
copy ..\app.js 
copy ..\db.js 
copy ..\controllers\*.* controllers\
copy ..\models\*.* models\
copy ..\public\*.* public\
copy ..\views\*.* views\
@ECHO OFF
ECHO --------------
ECHO FINISHED COPYING BACK TO GIT FOLDER.
ECHO NOW ADD, COMMIT, MERGE, UPDATE
ECHO ---------------
pause>nul