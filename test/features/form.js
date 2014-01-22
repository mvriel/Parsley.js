define(function () {
  return function (ParsleyForm, Parsley) {
    describe('ParsleyForm', function () {
      it('should be an function', function () {
        expect(ParsleyForm).to.be.a('function');
      });
      it('should throw an error if no element given', function () {
        expect(ParsleyForm).to.throwException();
      });
      it('should bind parsleyFields children', function () {
        $('body').append(
          '<form id="element">'                 +
            '<input id="field1" type="text"/>'  +
            '<div id="field2"></div>'           +
            '<textarea id="field2"></textarea>' +
          '</form>');
        parsleyForm = new Parsley($('#element'));
        expect(parsleyForm.fields.length).to.be(2);
      });
      it('should bind parsleyFields children, and not excluded ones', function () {
        $('body').append(
          '<form id="element">'                 +
            '<input id="field1" type="text"/>'  +
            '<div id="field2"></div>'           +
            '<textarea id="field2"></textarea>' +
            '<div data-parsley-validate></div>' + // ParsleyForm, not a valid child
            '<input type="submit"/>'            + // Excluded field, not valid
          '</form>');
        parsleyForm = new Parsley($('#element'));
        expect(parsleyForm.fields.length).to.be(2);
      });
      it('should properly bind options for form and children fields', function () {
        $('body').append(
          '<form id="element" data-parsley-trigger="change">'                 +
            '<input id="field1" type="text" data-parsley-required="true" />'  +
            '<div id="field2"></div>'                                         +
            '<textarea id="field3" data-parsley-notblank="true"></textarea>'  +
          '</form>');
        parsleyForm = new Parsley($('#element'));
        expect(parsleyForm.fields.length).to.be(2);
        expect(new Parsley('#field1').options.trigger).to.be('change');
        expect(new Parsley('#field1').options).to.have.key('required');
        expect(new Parsley('#field1').options).to.not.have.key('notblank');
        expect(new Parsley('#field3').options).to.have.key('notblank');
        expect(new Parsley('#field3').options).to.not.have.key('required');
      });
      it.skip('should handle group validation');
      afterEach(function () {
        if ($('#element').length)
          $('#element').remove();
      });
    });
  }
});
