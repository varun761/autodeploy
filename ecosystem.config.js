module.exports = {
  apps : [{
    name: 'Gatsby-API',
    script: 'index.js',
	exec_mode : "cluster",
    instances: "max",
    autorestart: true,
	error_file: './logs/err.log',
	out_file: './logs/out.log',
	log_file: './logs/combined.log',
	time: true,
	// max_memory_restart: "850M",
    watch: false,
	  node_args : "--max-old-space-size=32000",
    env: {
      NODE_ENV: 'prod'
    },
    env_production: {
      NODE_ENV: 'prod'
    },
    env_development: {
      NODE_ENV: 'devl'
    }
  }]
}
