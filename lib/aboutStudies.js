/*
 * This jquery script just adds minimal behavior so that users can toggle
 * Pioneer experiments as a whole and heatmap experiments.
 *
 */

function notifyNodeChange(elem) {
  let checked = elem.prop('checked');
  let elem_id = elem.id;
}

function main() {
  $("#allstudy_killswitch").click(() => {
    let node = $("#allstudy_killswitch");
    let check_val = node.prop("checked");
    $('*[id^="study_"]').each((index, elem) => {
      if (elem.disabled !== true) {
        elem.checked = check_val;
        console.log(`[${elem.id}] found`);
        notifyNodeChange(elem);
      }
    });
  });

  $('*[id^="study_"]').click(function() {
    console.log(`[${this.id}] checkbox hit`);
    notifyNodeChange(this);
  });
}

main();
