. /usr/src/app_build_hash
echo "${REACT_APP_PUBLIC_BACKEND_URL:-http://127.0.0.1:8081}" > "/usr/share/nginx/html/backend-url.$REACT_APP_BUILD_HASH.txt"