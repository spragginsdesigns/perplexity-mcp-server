Set WshShell = CreateObject("WScript.Shell")
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
command = "node " & strPath & "\cursor-entry.js"

' Run the command with window hidden (0 = hidden)
WshShell.Run command, 0, false