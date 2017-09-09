:: copy files from cloned git folder to 
:: the local dev folder
:: this is run from the cloned folder

@ECHO OFF 
ECHO --------------------
ECHO copyGit2local.cmd
ECHO --------------------
ECHO BATCH FILE TO COPY FROM CLONED GIT
ECHO TO LOCAL DEV FOLDER
ECHO ---------------------
:: ECHO ON
copy app.js ..\
copy db.js ..\
copy controllers\*.* ..\controllers\
copy models\*.* ..\models\
copy public\*.* ..\public\
copy views\*.* ..\views\
@ECHO OFF
ECHO --------------
ECHO FINISHED COPYING. USE copyLocal2Git.cmd  TO
ECHO copy back to git folder to merge and pushing.
ECHO ---------------
pause>nul