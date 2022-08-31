. /usr/src/app_build_hash
echo "
    window.REACT_APP_PUBLIC_BACKEND_URL = '${REACT_APP_PUBLIC_BACKEND_URL:-http://127.0.0.1:8081}';
" > "/usr/share/nginx/html/env-config.$REACT_APP_BUILD_HASH.js"