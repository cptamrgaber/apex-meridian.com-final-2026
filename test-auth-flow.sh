#!/bin/bash
echo "=== Testing Employee Authentication Flow ==="
echo ""
echo "1. Testing login with admin credentials..."
LOGIN_RESPONSE=$(curl -s -c /tmp/cookies.txt -X POST "http://localhost:3000/api/trpc/employee.login" \
  -H "Content-Type: application/json" \
  -d '[{"username":"admin","password":"admin123"}]')
echo "Login response: $LOGIN_RESPONSE"
echo ""

echo "2. Testing employee.me with session cookie..."
ME_RESPONSE=$(curl -s -b /tmp/cookies.txt "http://localhost:3000/api/trpc/employee.me")
echo "Me response: $ME_RESPONSE"
echo ""

echo "3. Checking if cookie was set..."
cat /tmp/cookies.txt | grep employee_session
echo ""
echo "=== Test Complete ==="
