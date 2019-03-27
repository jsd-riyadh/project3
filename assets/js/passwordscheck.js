$(document).ready(function() {
  $('.password').keyup(function() {
    $('.password-indicator-badge-absolute').html(checkStrength($('.password').val()))
  })
function checkStrength(password) {
  var strength = 0
  if (password.length < 6) {
    removecl();
    $('.password-indicator-badge-absolute').addClass('short');
    return 'كلمة المرور قصيرة'
  }
  if (password.length > 7) strength += 1
// If password contains both lower and uppercase characters, increase strength value.
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
// If it has numbers and characters, increase strength value.
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
// If it has one special character, increase strength value.
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
// If it has two special characters, increase strength value.
  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
// Calculated strength value, we can return messages
// If value is less than 2
  if (strength < 2) {
    removecl();
    $('.password-indicator-badge-absolute').addClass('weak')
    return 'ضعيفة'
} else if (strength <= 3) {
    removecl();
    $('.password-indicator-badge-absolute').addClass('good')
    return 'جيدة'
  } else {
  removecl();
    $('.password-indicator-badge-absolute').addClass('strong')
    return 'قوية'
  }
}
function removecl() {
  $('.password-indicator-badge-absolute').removeClass('strong');
  $('.password-indicator-badge-absolute').removeClass('weak');
  $('.password-indicator-badge-absolute').removeClass('good');
  $('.password-indicator-badge-absolute').removeClass('short');
  return;
}
$('[data-toggle="popover"]').popover();
});
