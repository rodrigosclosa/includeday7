
package com.ciandt.includeday7.backend.model;

import java.io.Serializable;
import java.util.List;

import com.google.appengine.repackaged.com.google.gson.annotations.Expose;
import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;

public class Color implements Serializable
{

    @SerializedName("dominantColorForeground")
    @Expose
    private String dominantColorForeground;
    @SerializedName("isBWImg")
    @Expose
    private Boolean isBWImg;
    @SerializedName("accentColor")
    @Expose
    private String accentColor;
    @SerializedName("dominantColorBackground")
    @Expose
    private String dominantColorBackground;
    @SerializedName("dominantColors")
    @Expose
    private List<String> dominantColors = null;
    private final static long serialVersionUID = 708931543766329061L;

    public String getDominantColorForeground() {
        return dominantColorForeground;
    }

    public void setDominantColorForeground(String dominantColorForeground) {
        this.dominantColorForeground = dominantColorForeground;
    }

    public Boolean getIsBWImg() {
        return isBWImg;
    }

    public void setIsBWImg(Boolean isBWImg) {
        this.isBWImg = isBWImg;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public String getDominantColorBackground() {
        return dominantColorBackground;
    }

    public void setDominantColorBackground(String dominantColorBackground) {
        this.dominantColorBackground = dominantColorBackground;
    }

    public List<String> getDominantColors() {
        return dominantColors;
    }

    public void setDominantColors(List<String> dominantColors) {
        this.dominantColors = dominantColors;
    }

}
