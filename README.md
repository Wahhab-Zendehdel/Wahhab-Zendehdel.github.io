# --- Settings ---
$exposedPort = "3000"
$wslIP = wsl hostname -I | Select-Object -First 1

# --- Port Forwarding Rule ---
# This rule makes Windows listen on all its IP addresses on port 3000 and forward traffic to WSL.

# Remove any old rule first to avoid conflicts
netsh interface portproxy delete v4tov4 listenport=$exposedPort listenaddress=0.0.0.0

# Add the new port forwarding rule
netsh interface portproxy add v4tov4 listenport=$exposedPort listenaddress=0.0.0.0 connectport=$exposedPort connectaddress=$wslIP

# --- Firewall Rule ---
# This rule allows other computers on your network to connect to port 3000 on this machine.
New-NetFirewallRule -DisplayName "WSL Port $exposedPort Forward" -Direction Inbound -Action Allow -Protocol TCP -LocalPort $exposedPort

Write-Host "Success! Port $exposedPort is now forwarded to WSL and open on the firewall."
Write-Host "Try accessing http://172.22.16.187:$exposedPort from your other computer. 👍"
