var React = require('react');
var segmentioSnippet = require('segmentio-snippet');

var SegmentioSnippet = React.createClass({
    render() {
        var snippet, user;
        if(this.props.writeKey) {
            // Generate snippet code
            snippet = segmentioSnippet.min({
                apiKey: this.props.writeKey,
                host: this.props.host || 'cdn.segment.com'
            });
            // Identify call for user
            if(this.props.user) {
                user = this.props.user;
                snippet += ';analytics.identify(' + user.id + ', ' + JSON.stringify(user) + ');';
            }
            // Inject code into script tag
            return React.createElement('script', {
                dangerouslySetInnerHTML={__html: snippet},
                type: "text/javascript"
            });

        }
        else {
            return <!-- SegmentIO writeKey not defined -->
        }
    }

});

export default SegmentioSnippet;
