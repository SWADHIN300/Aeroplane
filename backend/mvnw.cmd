@REM Maven Wrapper startup script for Windows
@echo off
@setlocal

set "MAVEN_PROJECTBASEDIR=%~dp0"
set "WRAPPER_JAR=%~dp0.mvn\wrapper\maven-wrapper.jar"

@REM Find java.exe
if defined JAVA_HOME (
    set "JAVACMD=%JAVA_HOME%\bin\java.exe"
) else (
    for %%i in (java.exe) do set "JAVACMD=%%~$PATH:i"
)

if not exist "%JAVACMD%" (
    echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
    exit /b 1
)

if not exist "%WRAPPER_JAR%" (
    echo ERROR: Could not find maven-wrapper.jar
    exit /b 1
)

"%JAVACMD%" %MAVEN_OPTS% ^
  "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR% " ^
  -classpath "%WRAPPER_JAR%" ^
  org.apache.maven.wrapper.MavenWrapperMain %*

exit /b %ERRORLEVEL%
