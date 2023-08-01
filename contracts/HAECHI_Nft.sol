// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./vrf.sol" ;

contract NFT_c is ERC721("LIONTICKET", "LT") , Ownable {

    address sub_owner ;
    uint totalSupply = 0 ;
    VRFv2Consumer v_c = VRFv2Consumer( 0x7C9b32097b83EBD17b842630DFc5d2402d5ca078 ) ;
    mapping( uint => uint ) attribute ;
    mapping( address => mapping( uint => bool ) ) chk_mint ;
    string[] public URI ;

    function withdraw( uint _amount ) public onlyOwner { // sub_true // 특정 경기의 수익금 출금
        payable( owner() ).transfer( _amount ) ;
    }

    function push_STAMP( string memory _input , uint n ) public returns( uint ){
        // 시간 되면 백엔드 만들어서 유저 가스비 부담 x

        require( chk_mint[ msg.sender ][ n ] == false ) ;
        chk_mint[ msg.sender ][ n ] = true ;
        uint t_ID = totalSupply ;
        _mint( msg.sender, t_ID ) ;
        URI.push( _input ) ;
        totalSupply = t_ID + 1 ;
        return t_ID ;

    }

    function tokenURI(uint _tokenID) public override view returns(string memory) {
        return URI[ _tokenID ] ;
    }

     event Raffle( uint indexed _idx , address indexed _add , string _eng_name , string _ko_name , string _font ) ;
  
    function Raffle_participate( uint _n , string memory e , string memory k , string memory f ) public {
        require( balanceOf( msg.sender ) >= 1 ) ;
        emit Raffle( _n , msg.sender , e , k , f ) ;
        
    }

    function Raffle_End( uint _n , uint num ) public view returns( uint ) {//onlyOwner() returns( uint ) {
        uint r = v_c.getR() % num ;
        return r ;
    }

}