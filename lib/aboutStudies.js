/*
 * This jquery script just adds minimal behavior so that users can toggle
 * Pioneer experiments as a whole and heatmap experiments.
 *
 */

function notifySwitchChange(checked) {
  content.dispatchEvent(new content.CustomEvent("AboutPioneerOptions",
    {detail: JSON.stringify({enabled: checked})}
  ));
}


function main() {
  $("#allstudy_killswitch").click(() => {
    let node = $("#allstudy_killswitch");
    let check_val = node.prop("checked");
    notifySwitchChange(check_val);
  });

  $('*[id^="study_"]').click(function() {
    console.log(`[${this.id}] checkbox hit`);
    notifyNodeChange(this);
  });
}

main();
