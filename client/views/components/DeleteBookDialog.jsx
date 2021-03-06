var React = require('react');
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;

var DeleteBookDialog = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        isbn: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        getBooks: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            open: false
        };
    },
    startDialog: function() {
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    deleteBook: function() {
        var update = this.props.getBooks;
        var data = {
            id: this.props.id
        };

        $.ajax({
            url: 'http://localhost:3333/api/books', 
            type: 'DELETE',
            data: data,
            success: (function() {
                update()
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
            label="YES, DELETE BOOK"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.deleteBook}
          />,
        ];
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
                title="Are you certain you want to delete this book ?"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                bodyStyle={dialStyle}
            >
                <div style={elemStyle}>
                    <p>{this.props.id}: {this.props.title}</p>
                    <p>{this.props.author}</p>
                    <p>{this.props.isbn}</p>
                    <p>{this.props.date}</p>
                </div>
            </Dialog>
        );
    }
});

module.exports = DeleteBookDialog;
