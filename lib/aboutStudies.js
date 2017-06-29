/*
 * This jquery script just adds minimal behavior so that users can toggle
 * Pioneer experiments as a whole and heatmap experiments.
 *
 */

function main() {
  $("#allstudy_killswitch").click(() => {
    $('*[id^="study_"]').each((index, elem) => {
      elem.checked = false;
      console.log(`[${elem.id}] found`);
    });
  });

  $('*[id^="study_"]').click(function() {
    console.log(`[${this.id}] checkbox hit`);
  });
}

main();

