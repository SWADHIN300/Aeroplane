@REM Maven Wrapper startup script for Windows
@echo off

@setlocal

set ERROR_CODE=0

@REM Find java.exe
if not "%JAVA_HOME%"=="" goto OkJHome
for %%i in (java.exe) do set "JAVACMD=%%~$PATH:i"
goto checkJCmd

:OkJHome
set "JAVACMD=%JAVA_HOME%\bin\java.exe"

:checkJCmd
if exist "%JAVACMD%" goto chkMWrapper
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
goto error

:chkMWrapper
set WRAPPER_JAR="%~dp0\.mvn\wrapper\maven-wrapper.jar"
if exist %WRAPPER_JAR% goto runWrapper
echo ERROR: Could not find maven-wrapper.jar
goto error

:runWrapper
"%JAVACMD%" ^
  %MAVEN_OPTS% ^
  -classpath %WRAPPER_JAR% ^
  org.apache.maven.wrapper.MavenWrapperMain %*

if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /b %ERROR_CODE%
