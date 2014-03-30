var app_name = 'timer';
var exit_instrunctions = 'press ctrl-c to exit';
var intervals = [];
var interval;
var current_interval_id = 0;

//application logic
if(process.argv.length < 3){
  show_error_and_exit();
}
for(var i=2; i<process.argv.length; ++i){
  interval = parseFloat(process.argv[i]);
  if(isNaN(interval))
    show_error_and_exit();
  intervals.push(interval);
}
console.log('%s is running', app_name);
start_timer();

//helper functions
function show_error_and_exit(){
  console.log('Usage: node %s [timer intervals in minutes]\n' +
    'eg: node %s 3.25 0.5 4', app_name, app_name);
  process.exit();
}

function advance_interval_id(){
  if(++current_interval_id === intervals.length)
    current_interval_id = 0;
}

function start_timer(){
  console.log('\u0007');
  console.log('next beep in %s minutes\n%s',
    intervals[current_interval_id], exit_instrunctions);
  setTimeout(function(){
    advance_interval_id()
    start_timer();
  }, intervals[current_interval_id] * 1000 * 60);
}
