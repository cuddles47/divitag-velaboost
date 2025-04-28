@echo off
echo Frontend Refactoring Tool
echo ========================

REM Create necessary directories in frontend if they don't exist
mkdir frontend\app
mkdir frontend\components
mkdir frontend\context
mkdir frontend\forms
mkdir frontend\layout
mkdir frontend\modules\admin
mkdir frontend\modules\base
mkdir frontend\modules\master-data
mkdir frontend\modules\users
mkdir frontend\config\enums
mkdir frontend\public
mkdir frontend\styles
mkdir frontend\types
mkdir frontend\validation

echo Directory structure verified.

REM Move app files
echo Moving app files...
xcopy /E /I /Y src\app frontend\app

REM Move components
echo Moving shared components...
xcopy /E /I /Y src\shared\components frontend\components

REM Move context files
echo Moving context files...
IF EXIST src\shared\context xcopy /E /I /Y src\shared\context frontend\context

REM Move module files
echo Moving domain/module files...
xcopy /E /I /Y src\domains\admin frontend\modules\admin
xcopy /E /I /Y src\domains\store frontend\modules\base
xcopy /E /I /Y src\domains\product frontend\modules\master-data

REM Move types
echo Moving types...
xcopy /E /I /Y src\shared\types frontend\types

REM Move styles
echo Moving styles...
xcopy /E /I /Y src\app\globals.css frontend\styles\globals.css
IF EXIST src\shared\styles xcopy /E /I /Y src\shared\styles frontend\styles

echo Frontend refactoring completed.
echo Please remember to update imports in your files to reflect the new structure.
pause