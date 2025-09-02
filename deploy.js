const ghpages = require('gh-pages');

ghpages.publish('public', {
  repo: 'https://github.com/synergyclub/synergyclub.github.io.git',
  user: {
    name: 'Synergyclub',
    email: 'shhssynergy@gmail.com'
  },
  branch: 'gh-pages',
  message: 'Deploying static site via script'
}, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Deployment successful!');
  }
});
