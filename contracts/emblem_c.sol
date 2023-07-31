// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Emblem_contract is ERC721Enumerable , Ownable {
    string[] public URI;
    mapping( address => bool[6] ) chk_level ;

    constructor( string memory base ) ERC721("HAECHI_721", "HC") {
        URI.push(base) ;
    }

    function mintNFT() public {
        require( balanceOf( msg.sender ) == 0 ) ;
        _mint(msg.sender, totalSupply() + 1);
    }

    function push_HAECHI_Emblem( string memory input ) public onlyOwner{
        URI.push( input ) ;
    }

    function push_Stamp( uint _n ) public {
        chk_level[ msg.sender ][ _n ] = true ;
    }

    function tokenURI(uint _tokenID) public override view returns(string memory) {

        address _o = ownerOf( _tokenID );
        uint cnt = 0 ;

        for( uint i = 0 ; i < URI.length - 1 ; i ++ ){
            if( chk_level[ _o ][ i ] == true ) cnt ++ ;
        }

        return URI[ cnt ] ;

    }
}