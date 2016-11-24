var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var DatePicker = require('material-ui/DatePicker').default;
var TextField = require('material-ui/TextField').default;

var DeleteReservationDialog = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        bookId: React.PropTypes.number.isRequired,
        from: React.PropTypes.string.isRequired,
        to: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            id: this.props.id,
            bookId: this.props.bookId,
            from: this.props.from,
            to: this.props.to,
            open: false
        };
    },
    startDialog: function() {
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    deleteReservation: function() {
        var data = {
            id: this.props.id
        };

        $.ajax({
            url: 'http://localhost:3333/api/bookreservations', 
            type: 'DELETE',
            data: data,
            success: (function() {
                alert("The book has been deleted successfully");
            })
        });

        this.setState({open: false});
    },
    render: function() {
        const actions = [
          <FlatButton
            label="CANCEL"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.closeDialog}
          />,
          <FlatButton
            label="YES, DELETE RESERVATION"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.deleteReservation}
          />,
        ];
        var that = this;
        var dialStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            textAlign: 'center',
            alignItems: 'center'
        };
        var elemStyle = {
            display: 'flex',
            flexDirection: 'column'
        };
         return (
            <Dialog
                title="Are you certain you want to delete this book reservation ?"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                bodyStyle={dialStyle}
            >
                <div style={elemStyle}>
                    <p>{this.props.id}:{this.props.bookId}</p>
                    <p>{this.props.from}</p>
                    <p>{this.props.to}</p>
                </div>
            </Dialog>
        );
    }
});

module.exports = DeleteReservationDialog;