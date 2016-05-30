var React = require('react');
const prevPageNavSrc = require('../../assets/images/previous.png');
const nextPageNavSrc = require('../../assets/images/next.png');
const maxLinks = 7;
class ProductPaginationBar extends React.Component
{	
	constructor() {
         super()        
       
         this.state = {numberOfLinks:0,currentLastPage:1,numberofMaxLinks:[],currentMaxLinkIndex:0}
         
       }


	componentWillReceiveProps(nextProps) {

		this.setState({numberOfLinks:nextProps.totalPages});
		var numberofMaxLinksIndices = Math.floor(nextProps.totalPages/maxLinks);
		var numberofMaxLinks = []; 
		var currentMaxLinkIndex = 1;
		for(var m = 0 ;m < numberofMaxLinksIndices;m++)
		{
				var links = [];

				for(var m = 1;m<maxLinks+1;m++)
				{
					links.push(currentMaxLinkIndex);
					currentMaxLinkIndex++;
				}

				if(links.length >0)
				{
					numberofMaxLinks.push(links);
				}
				

		}

		var remainderLinks = nextProps.totalPages%maxLinks;

		var lastLinks = []
		for(var r = 0;r<remainderLinks;r++)
		{
			lastLinks.push(currentMaxLinkIndex);
			currentMaxLinkIndex++;
		}
		
		if(lastLinks.length >0 )
		{
			numberofMaxLinks.push(lastLinks);
		}
		
		this.setState({numberofMaxLinks:numberofMaxLinks});
	}

	

	previousBtnClick(){
		
			if(this.state.currentLastPage >1)
			{	
				var currentLastPage  = this.state.currentLastPage;
				currentLastPage -= 1;
				this.updateStates(currentLastPage);
			}
		

	}

	nextBtnClick(){		

		if(this.state.currentLastPage<this.state.numberOfLinks)
		{
			var currentLastPage  = this.state.currentLastPage;
			currentLastPage += 1;
			this.updateStates(currentLastPage);
			
		}
	}

	setCurrentPage(view){
		var currentLastPage = parseInt(view.currentTarget.innerText);
		this.updateStates(currentLastPage);
	}

	updateStates(currentLastPage)
	{
			var currentIndex = Math.floor((currentLastPage-1)/7);
			this.setState({currentMaxLinkIndex:currentIndex});
			this.setState({currentLastPage:currentLastPage});			
			this.props.loadPage(currentLastPage)
	}

	resetComponent()
	{
		this.setState({numberOfLinks:0,currentLastPage:1,numberofMaxLinks:[],currentMaxLinkIndex:0})
	}

	 render() { 	 	
	 		
	 		var links = [];
	 		
	 		if(this.state.numberofMaxLinks && this.state.numberofMaxLinks.length>0)
	 		{
	 			var linksToCreate = this.state.numberofMaxLinks[this.state.currentMaxLinkIndex];
				for(var l = 0;l<linksToCreate.length;l++)
		 		{		
		 				var link = <span className = "linkStyle"style={{margin:"1px",padding:"1px" ,color:this.state.currentLastPage==linksToCreate[l]?'blue':'black',fontWeight:this.state.currentLastPage==linksToCreate[l]?'bold':''}} key = {linksToCreate[l]}  onClick={this.setCurrentPage.bind(this)}>{linksToCreate[l]}</span>;
		 				links.push(link)
		 		}
	 		}	
	 	
	 		

	 		return <div>
			 		<span style={{display:this.state.numberOfLinks == 0?'none':''}}>
			 			<img src={prevPageNavSrc} className = "paginationButton" onClick={this.previousBtnClick.bind(this)} />
			 		</span>
	 				 
	 					{links}{this.state.numberofMaxLinks && this.state.numberofMaxLinks.length>0?this.state.currentMaxLinkIndex==this.state.numberofMaxLinks.length-1?'':'...':''}
	 				 <span style={{display:this.state.numberOfLinks == 0?'none':''}}>
	 				 	<img src={nextPageNavSrc} className = "paginationButton" onClick={this.nextBtnClick.bind(this)} style={{display:this.state.numberOfLinks.length == 0?'none':''}}/>
	 				 </span>
	 				</div>
	 }
}

ProductPaginationBar.propTypes = {
   loadPage:React.PropTypes.func   
}


export default ProductPaginationBar;