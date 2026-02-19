<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/employees">
    <COMPANY>
      <xsl:apply-templates select="employee"/>
    </COMPANY>
  </xsl:template>

  <xsl:template match="employee">
    <EMPLOYEE>
      <xsl:attribute name="TOWN">
        <xsl:value-of select="town"/>
      </xsl:attribute>
      <xsl:text>
    </xsl:text>
      <xsl:value-of select="name"/>
      <xsl:apply-templates select="degree"/>
    </EMPLOYEE>
  </xsl:template>

  <xsl:template match="degree">
    <xsl:text>
    </xsl:text>
    <TITLE>
      <xsl:value-of select="."/>
      <xsl:text> (</xsl:text>
      <xsl:value-of select="@level"/>
      <xsl:text>)</xsl:text>
    </TITLE>
  </xsl:template>

</xsl:stylesheet>
