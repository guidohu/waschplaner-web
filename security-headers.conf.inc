# Included in every location of nginx.conf: nginx drops the server's add_header
# lines in any location that sets its own, so they are repeated here.
add_header X-Content-Type-Options nosniff always;
add_header Referrer-Policy strict-origin-when-cross-origin always;
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'" always;
