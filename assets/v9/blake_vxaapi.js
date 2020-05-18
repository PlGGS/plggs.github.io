
//============================================================================================================

//-----------------------------------------------------------------------------------------------------------=
const	qEditSymb			=	2001;
const	qEditDate			=	2002;
const	qEditUser			=	2100;
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
const	littleEndian	=	true;
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
var v9 = {

	PRICE_NULL_32		:	2147483647,
	PRICE_NULL_64		:	9223372036854775807n,
	sGroupSettleID		:	4294967293,

	Aggressor	:	
	{
		NoAggressor					: 0,
		Buy							: 1,
		Sell						: 2
	},

	HaltReason	:
	{
		NotSet						: 255,
		GroupSchedule				: 0,
		SurveillanceIntervention	: 1,
		MarketEvent					: 2,
		InstrumentActivation		: 3,
		InstrumentExpiration		: 4,
		Unknown						: 5,
	    RecoveryInProcess			: 6
	},

	SecurityType	:
	{
		NotSet						: 0,
		TradingHalt					: 2,
		Close						: 4,
		NewPriceIndication			: 15,
		ReadyToTrade				: 17,
		NotAvailableForTrading		: 18,
		UnknownorInvalid			: 20,
		PreOpen						: 21,
		PreCross					: 24,
		Cross						: 25,
		PostClose					: 26,
		NoChange					: 103,
		PreClos						: 150,
		Restricted					: 200,
		Freeze						: 201
	},

	SecurityEvent	:
	{
		NoEvent						: 0,
		NoCancel					: 1,
		ResetStatistics				: 4,
		ImpliedMatchingON			: 5,
		ImpliedMatchingOFF			: 6
	},

	BookType	:
	{
		NotSet						: 85,
		Bid							: 66,
		Ask							: 83,
		ImpliedBid					: 98,
		ImpliedAsk					: 115,
		BookReset					: 82
	},

	DailyStatisticsType	:
	{
		SettlementPrice				: 54,
		ClearedVolume				: 66,
		OpenInterest				: 67,
		FixingPrice					: 87
	},

	BookAction	:
	{
		NotSet						: 255,
		New							: 0,
		Change						: 1,
		Delete						: 2,
		DeleteThru					: 3,
		DeleteFrom					: 4,
		Overlay						: 5,
		Replace						: 6
	},

	SessionStatisticsType	:
	{
		NotSet						: 127,
		OpenPrice					: 0,
		HighTrade					: 1,
		LowTrade					: 2,
		LastTrade					: 3,
		HighestBid					: 4,
		LowestAsk					: 5,
		ClosePrice					: 6
	},

  
	StateType	:
	{
		NotSet						: 255,
		DailyOpenPrice				: 0,
		IndicativeOpeningPrice		: 5,
		DailyClosePrice				: 10
	},

	PutOrCall	:
	{
		NotSet						: 255,
		Put							: 0,
		Call						: 1  
	},

	SettleType	:
	{
		Final						: 1,
		Actual						: 2,
		Rounded						: 4,
		Intraday					: 8,
		ReservedBits				: 16,
		NullValue					: 128
	},

	TransactionType	:
	{
		NotSet						: 255,
		TransactionStart			: 0,
		TransactionEnd				: 1
	},

	EventIndicator	:
	{
		NotSet						: 0,
		LastOfType					: 1,
		EndOfEvent					: 128
	},

	UnionID				:
	{
		NotSet						: 255,
		NotMapped					: 250,
		TradeSummary				: 0,
		TradeMatch					: 1,
		VolumeUpdate				: 2,
		BookLevel					: 3,
		OrderBook					: 4,
		SecurityStatus				: 5,
		DailyStatistics				: 6,
		SessionStatistics			: 7,
		LimitsBanding				: 8,
		ChannelReset				: 9,
		TransactionMarker			: 10,
		Test						: 11,
		ClearingPrice				: 12
	}

};
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
function	DSS (a,b,c,d,e,f,g,h,i,j)
{
	var	text	=	"";
	if ((a !== undefined) && (a!=null))	text	+=	 a	+ ",";
	if ((b !== undefined) && (b!=null))	text	+=	 b	+ ",";
	if ((c !== undefined) && (c!=null))	text	+=	 c	+ ",";
	if ((d !== undefined) && (d!=null))	text	+=	 d	+ ",";
	if ((e !== undefined) && (e!=null))	text	+=	 e	+ ",";
	if ((f !== undefined) && (f!=null))	text	+=	 f	+ ",";
	if ((g !== undefined) && (g!=null))	text	+=	 g	+ ",";
	if ((h !== undefined) && (h!=null))	text	+=	 h	+ ",";
	if ((i !== undefined) && (i!=null))	text	+=	 i	+ ",";
	if ((j !== undefined) && (j!=null))	text	+=	 j	+ ",";
	console.log (text);
}
//-----------------------------------------------------------------------------------------------------------=

//============================================================================================================

//-----------------------------------------------------------------------------------------------------------=
var	gFeed;
var	gUniq		=	window.frameElement.id;
var	gHome		=	window.parent;
var	gEditSequ	=	qEditUser;
var	gEditMaps	=	new Map();
var	gEditList	=	new Array();
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.edit = class
{
	//-----------------------------------------------------------------------------------------------------------=
	constructor (pEditName) 
	{
		this.fEditType	=	qEditSymb;
		this.fEditName	=	pEditName;
		
		if (pEditName)	{
			
			if (gEditMaps[pEditName.toUpperCase()])	{
				gHome._pageerro (gUniq,"Edit name already defined");
				}
			else	{
				gEditMaps[pEditName.toUpperCase()]	=	true;
				}

			if (pEditName.toUpperCase() === "SYMBOL")	{
				this.fEditType	=	qEditSymb;
				}
			else if (pEditName.toUpperCase() === "DATE")	{
				this.fEditType	=	qEditDate;
				}
			else	{
				gEditList.push(this);
				this.fEditType	=	gEditSequ++;
				}

			this.fEditEnum	=	gHome.MakeEdit (gUniq,this.fEditType,pEditName);
			}
		else	{
			gHome._pageerro (gUniq,"Edit name must be defined");
			}

	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	onLoad()
	{
		this._value	=	null;
		this._number	=	null;
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	set value (pEdit)
	{
		return gHome.EditSave (gUniq,this.fEditType,pEdit);
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	get value ()
	{  
		if (this._value)	return this._value;

		if (this.fEditType >= qEditUser)	{
			this._value =	 gHome.EditRead (gUniq,this.fEditType);
			}
		else	{
			this._value	=	 gHome.EditRead (gUniq,this.fEditType);
			}
		return this._value;
	}
	//-----------------------------------------------------------------------------------------------------------=
	
	////-----------------------------------------------------------------------------------------------------------=
	//get symbol ()
	//{
	//	return  (this.fEditType==qEditSymb) ? 	this.value : "";
	//}
	////-----------------------------------------------------------------------------------------------------------=
	//
	////-----------------------------------------------------------------------------------------------------------=
	//get date ()
	//{
	//	return  (this.fEditType==qEditDate) ? 	this.value : "";
	//}
	////-----------------------------------------------------------------------------------------------------------=
	
	//-----------------------------------------------------------------------------------------------------------=
	get number ()
	{
		if (this._number)	return this._number;
		this._number	=	  parseFloat(this.value);
		return this._number;
	}
	//-----------------------------------------------------------------------------------------------------------=
	
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.lineChart = class
{
	constructor (pID) {
		this.fLineEnum		=	gHome.MakeLine (gUniq,(pID) ? document.getElementById(pID) : null);
		}

	linePush (pItem,pRate,pTime)
	{
		gHome.LinePush (gUniq,pItem.fCalcEnum,pRate,pTime);
	}

}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.cubeChart = class
{
	constructor (pID) {
		this.fCubeEnum		=	gHome.MakeCube (gUniq,(pID) ? document.getElementById(pID) : null);
		}

	cubePlus (pItem,pData,pSize)
	{
		gHome.CubePlus (gUniq,pItem,pData,pSize);
	}

	cubeHigh (pItem,pData,pSize)
	{
		gHome.CubeHigh (gUniq,pItem,pData,pSize);
	}

	cubeDele (pItem,pData)
	{
		gHome.CubeDele (gUniq,pItem,pData);
	}

	cubeSave (pItem,pData,pSize)
	{
		gHome.CubeSave (gUniq,pItem,pData,pSize);
	}

	cubeRead (pItem,pData)
	{
		gHome.CubeRead (gUniq,pItem,pData);
	}

	cubeFree (pItem)
	{
		gHome.CubeFree (gUniq,pItem);
	}

	cubePush (pItem,pSave)
	{
		gHome.CubePush (gUniq,pItem,pSave);
	}

}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.console = class
{
	constructor (pID) {
		this.fTalkEnum		=	gHome.MakeTalk (gUniq,(pID) ? document.getElementById(pID) : null);
		}

	print (pText) 
	{	
		gHome.TalkText (gUniq,pText)
	}

	//cubePlus (pItem,pData,pSize)
	//{
	//	gHome.CubePlus (gUniq,pItem,pData,pSize);
	//}

	//cubeDele (pItem,pData)
	//{
	//	gHome.CubeDele (gUniq,pItem,pData);
	//}

	//cubeSave (pItem,pData,pSize)
	//{
	//	gHome.CubeSave (gUniq,pItem,pData,pSize);
	//}

	//cubeRead (pItem,pData)
	//{
	//	gHome.CubeRead (gUniq,pItem,pData);
	//}

	//cubeFree (pItem)
	//{
	//	gHome.CubeFree (gUniq,pItem);
	//}

	//cubePush (pItem,pSave)
	//{
	//	gHome.CubePush (gUniq,pItem,pSave);
	//}

}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.lineItem = class
{


	constructor (pPane) {
		try	{
			this.fCalcEnum		=	gHome.MakeCalc (gUniq,this);
			}  
		catch (e)	{
			gHome._pageerro (gUniq,"MakeCalc",e);
			}
		}

	set lineWidth (pData)
	{
		try	{
			this._lineWidth	=	pData;
			gHome.Calc_lineWidth (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"lineWidth",e);
			}
	}

	set strokeStyle (pData)
	{
		try	{
			this._strokeStyle	=	pData;
			gHome.Calc_strokeStyle (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"strokeStyle",e);
			}
	}

	set format (pData)
	{
		try	{
			this._format	=	pData;
			gHome.Calc_format (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"format",e);
			}
	}

	set textStyle (pData)
	{
		try	{
			this._textStyle	=	pData;
			gHome.Calc_textStyle (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"textStyle",e);
			}
	}

	set bodyStyle (pData)
	{
		try	{
			this._bodyStyle	=	pData;
			gHome.Calc_bodyStyle (gUniq,this.fCalcEnum,pData);
			//postMessage ([_Calc_bodyStyle,gCodeDash,this.fCalcUniq,pData]);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"textStyle",e);
			}
	}

	set title (pData)
	{
		try	{
			this._title	=	pData;
			gHome.Calc_title (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"title",e);
			}
	}

	set name (pData)
	{
		try	{
			this._name	=	pData;
			gHome.Calc_name (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"name",e);
			}
	}

	get lineWidth ()
	{
		return this._lineWidth;
	}

	get strokeStyle ()
	{
		return this._strokeStyle;
	}

	get textStyle ()
	{
		return this._textStyle;
	}

	get eventStyle ()
	{
		return this._eventStyle;
	}

	get title ()
	{
		return this._title;
	}

	get format ()
	{
		return this._format;
	}
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.cubeItem = class
{

	// constructor (pPane) {
	// 	try	{
	// 		this.fCalcEnum		=	gHome.MakeCalc (gUniq,this);
	// 		this.fCubeMaps		=	new Map();
    //     }  
	// 	catch (e)	{
	// 		gHome._pageerro (gUniq,"MakeCalc",e);
    //     }
    // }

    constructor (bodyStyle, strokeStyle) {
		try	{
			this.fCalcEnum		=	gHome.MakeCalc (gUniq,this);
            this.fCubeMaps		=	new Map();
            
            this.bodyStyle = bodyStyle;
            this.strokeStyle = strokeStyle;
        }  
		catch (e)	{
			gHome._pageerro (gUniq,"MakeCalc",e);
        }
    }

	set lineWidth (pData)
	{
		try	{
			this._lineWidth	=	pData;
			gHome.Calc_lineWidth (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"lineWidth",e);
			}
	}

	set strokeStyle (pData)
	{
		try	{
			this._strokeStyle	=	pData;
			gHome.Calc_strokeStyle (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerroo (gUniq,"strokeStyle",e);
			}
	}

	set format (pData)
	{
		try	{
			this._format	=	pData;
			gHome.Calc_format (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"format",e);
			}
	}

	set textStyle (pData)
	{
		try	{
			this._textStyle	=	pData;
			gHome.Calc_textStyle (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"textStyle",e);
			}
	}

	set bodyStyle (pData)
	{
		try	{
			this._bodyStyle	=	pData;
			gHome.Calc_bodyStyle (gUniq,this.fCalcEnum,pData);
			//postMessage ([_Calc_bodyStyle,gCodeDash,this.fCalcUniq,pData]);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"textStyle",e);
			}
	}

	set title (pData)
	{
		try	{
			this._title	=	pData;
			gHome.Calc_title (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"title",e);
			}
	}

	set name (pData)
	{
		try	{
			this._name	=	pData;
			gHome.Calc_name (gUniq,this.fCalcEnum,pData);
			}
		catch (e)	{
			gHome._pageerro (gUniq,"name",e);
			}
	}

	get lineWidth ()
	{
		return this._lineWidth;
	}

	get strokeStyle ()
	{
		return this._strokeStyle;
	}

	get textStyle ()
	{
		return this._textStyle;
	}

	get eventStyle ()
	{
		return this._eventStyle;
	}

	get title ()
	{
		return this._title;
	}

	get format ()
	{
		return this._format;
	}
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.eventToJson	=	 function (pEvent)
{
	let	tEvent	=	v9.eventCopy (pEvent);

    if (tEvent !== undefined) {
        let intCount = 0, repCount = 0;
        const json = JSON.stringify(tEvent, (_, v) => {
            if (typeof v === 'bigint') {
                intCount++;
                return `${v}#bigint`;
            }
            return v;
        });
        const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
            repCount++;
            return a;
        });
        if (repCount > intCount) {
            // You have a string somewhere that looks like "123#bigint";
            throw new Error(`BigInt serialization pattern conflict with a string value.`);
        }
        return res;
    }
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.objectCopy	=	 function (pObject)
{
	return Object.assign({},pObject);
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
v9.eventCopy	=	 function (pEvent)
{
	
	let	tEvent	=	{};

	if (pEvent.header)	{
		tEvent.header	=	v9.objectCopy (pEvent.header);
		}

	try	{
		switch (pEvent.header.unionID)	{
			case	v9.UnionID.TransactionMarker	:
				tEvent.transactionMarker	=	v9.objectCopy (pEvent.transactionMarker);
				break;
			case	v9.UnionID.ChannelReset			:
				tEvent.channelReset			=	v9.objectCopy (pEvent.channelReset);
				break;
			case	v9.UnionID.TradeSummary			:
				tEvent.tradeSummary			=	v9.objectCopy (pEvent.tradeSummary);
				break;
			case	v9.UnionID.TradeMatch			:
				tEvent.tradeMatch			=	v9.objectCopy (pEvent.tradeMatch);
				break;
			case	v9.UnionID.VolumeUpdate			:
				tEvent.volumeUpdate			=	v9.objectCopy (pEvent.volumeUpdate);
				break;
			case	v9.UnionID.BookLevel			:
				tEvent.bookLevel			=	v9.objectCopy (pEvent.bookLevel);
				break;
			case	v9.UnionID.OrderBook			:
				tEvent.orderBook			=	v9.objectCopy (pEvent.orderBook);
				break;			
			case	v9.UnionID.SecurityStatus		:
				tEvent.securityStatus		=	v9.objectCopy (pEvent.securityStatus);
				break;			
			case	v9.UnionID.DailyStatistics		:
				tEvent.dailyStatistics		=	v9.objectCopy (pEvent.dailyStatistics);
				break;
			case	v9.UnionID.SessionStatistics	:
				tEvent.sessionStatistics	=	v9.objectCopy (pEvent.sessionStatistics);
				break;
			case	v9.UnionID.LimitsBanding		:
				tEvent.limitsBanding		=	v9.objectCopy (pEvent.limitsBanding);
				break;
			case	v9.UnionID.ClearingPrice		:
				tEvent.clearingPrice		=	v9.objectCopy (pEvent.clearingPrice);
				break;
			}
		}  
	catch (e)	{
		tEvent	=	{};
		}

	return tEvent;
}
//-----------------------------------------------------------------------------------------------------------=			


//-----------------------------------------------------------------------------------------------------------=
v9.feed = class
{
		
	//-----------------------------------------------------------------------------------------------------------=
	constructor (pSymbol,pDate) 
	{
		//DSS ("CALLING PageBack");
		//gHome._pageback (gUniq,qMakeFeed,pSymbol);
		gHome.MakeFeed (gUniq,pSymbol,pDate);
		gFeed	=	this;
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	onInit ()
	{
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	onDone ()
	{
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	onOpen (pMeta)
	{
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	onLoad ()
	{
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	onEvent (pSymbol,pEvent,pRealTime)
	{
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	onRender ()
	{
	}
	//-----------------------------------------------------------------------------------------------------------=
	 
	//-----------------------------------------------------------------------------------------------------------=
	onStop ()
	{	  
	}
	//-----------------------------------------------------------------------------------------------------------=

	//-----------------------------------------------------------------------------------------------------------=
	formatPrice (pPrice,pSymbolID)
	{
		return gHome.FormatPrice (gUniq,pPrice,pSymbolID);
	}
	//-----------------------------------------------------------------------------------------------------------=
	
	////-----------------------------------------------------------------------------------------------------------=
	//symbol (pPrice,pSymbol)
	//{
	//	if (!_meta)	return "";
	//	return gHome._FracText (pPrice,pSymbol);
	//}
	////-----------------------------------------------------------------------------------------------------------=

}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
function onInit ()
{
	if (!gFeed)	return;
	gFeed.onInit ();
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
function onDone ()
{
	if (!gFeed)	return;
	gFeed.onDone ();
}
//-----------------------------------------------------------------------------------------------------------=


//-----------------------------------------------------------------------------------------------------------=
function onOpen (pMeta)
{
	if (!gFeed)	return;
	gFeed.onOpen (pMeta);
}
//-----------------------------------------------------------------------------------------------------------=

//----------------------------------------------------------------  -------------------------------------------=
function onLoad ()
{
	if (!gFeed)	return;
	gFeed.onLoad ();
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
function onEvent (pSymbol,pEvent,pRealTime)
{
	if (!gFeed)	return;
	gFeed.onEvent (pSymbol,pEvent,pRealTime);
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
function onRender ()
{
	if (!gFeed)	return;
	gFeed.onRender ();
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
function onStop ()
{	  
	if (!gFeed)	return;
	gFeed.onStop ();
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
function onReload ()
{	
	//DSS ("gEditList.length",gEditList.length);
	for (let cnt = 0; cnt < gEditList.length; cnt++)	{
		gEditList[cnt].onLoad();
		}
	location.reload();
}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
window.onerror = function (msg, url, lineNo, columnNo, error) {
	var string = msg.toLowerCase();
	var substring = "script error";
	if (string.indexOf(substring) > -1){
		gHome._pageerro (gUniq,'Script Error: See Browser Console for Detail');
		} 
	else {
		//var message = [
		//	'Message: ' + msg,
		//	'URL: ' + url,
		//	'Line: ' + lineNo,
		//	'Column: ' + columnNo,
		//	'Error object: ' + JSON.stringify(error)
		//].join(' - ');

		var message = [
			'Message: ' + msg,
			'Line: ' + lineNo,
			'Column: ' + columnNo
		].join(' - ');

		gHome._pageerro (gUniq,message);
		}
	}
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
window.onfocus= function() { 
	gHome._pagesele (gUniq);
};
//-----------------------------------------------------------------------------------------------------------=

//-----------------------------------------------------------------------------------------------------------=
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
		gHome._pageinit (gUniq,document.readyState);
  }
};
//-----------------------------------------------------------------------------------------------------------=